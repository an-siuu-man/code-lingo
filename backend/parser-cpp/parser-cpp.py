# -*- coding: utf-8 -*-

# --- CODELINGO C++ PARSER ---
# Author: Leo Cabezas Amigo

"""
IDEAS: Implement pointers, references, arrays
"""

import os
import json

cpp_data_types = [
    # PRIMITIVE TYPES
    'int',
    'float',
    'double',
    'char',
    'bool',
    'void',
    'wchar_t',
    'short',
    'long',
    'unsigned int',
    'unsigned long',
    'unsigned short',
    'signed char',
    'unsigned char',
    'long long',            # C++11 and later
    'unsigned long long',   # C++11 and later

    # HARDCODED COMPOUND TYPES
    'std::string'
]

next_chars = {
    "line_wspc"         :   [" ", "\t"],  # Is also: "begin_dtype"
    "end_dtype"         :   [" ", "\t", "=", ";", "("],
    "begin_keyword"     :   [" ", "\t", "(", "{", ";", ":"],
    "fwd_var_name"      :   [   ["="],
                                ["+=", "-=", "*=", "/=", "%=", "&=", "|=", "^=", "++", "--"],
                                ["<<=", ">>="]
                            ],
    "bwd_var_name"      :   [   ["++", "--"]
                            ]
}

class Parser_CPP:
    def __init__(self, code_file, eval_file = None):
        self.code = self._read_src(code_file)
        self.code_lines = self._read_src(code_file, byLine = True)

        self.json_dict = {"code": self.code, "executionSteps": []}
        self.jsonResponse = ""

        """
        self.cpp_keywords_dict = {
            "if"        : self._parse_if,
            "else"      : self._parse_else,
            "switch"    : self._parse_switch,
            "case"      : self._parse_case,
            "default"   : self._parse_default,
            "for"       : self._parse_for,
            "while"     : self._parse_while,
            "do"        : self._parse_do,
            "break"     : self._parse_break,
            "continue"  : self._parse_continue,
            "return"    : self._parse_return,
            "goto"      : self._parse_goto,
            "throw"     : self._parse_throw,
            "try"       : self._parse_try,
            "catch"     : self._parse_catch
        }
        """

        self.scope_stack = []
        self.scope_stack.append(["__SCOPE__GLOBAL__", len(self.code_lines), {}])
        self.scope_registry = [] 
    
    def _read_src(self, file, byLine = False):  # DONE!
        try:
            file.seek(0)
            return file.read() if not byLine else file.readlines()
        except:
            raise Exception("Error. Could not open src_code file.")
        
    def _parse_dtype(self, dtype, i, line, step):   # DONE!
        LOOP_COND = lambda i: i < len(self.code)
        
        i += len(dtype) + 1
        highlight = line
        
        while self.code[i] in next_chars["line_wspc"] and LOOP_COND(i):
            i += 1
        name_start = i
        while self.code[i] not in next_chars["end_dtype"] and LOOP_COND(i):
            i += 1
        name_end = i
        name = self.code[name_start:name_end]

        while self.code[i] in next_chars["line_wspc"] and LOOP_COND(i):
            i += 1

        argv = [i, line, step, highlight, name, dtype]
        if self.code[i] in ["=", ";"]: # Means it's VAR_DECLARE
            i, line = self._parse_VAR_DECLARE(argv)
        elif self.code[i] == "(":   # Means it's FUNCT_DEFINE
            i, line = self._parse_FUNCT_DEFINE(argv)
        else:
            raise Exception("Error! Unknown dtype-init statement.")
        
        step += 1

        return i, line, step
    
    def _parse_keyword(self, argv: list):   # DONE!
        LOOP_COND, keyword, i, line, step, keyword_i, keyword_line = argv
        
        i += len(keyword) + 1
        highlight = line
        
        argv = [LOOP_COND, i, line, step, highlight, keyword_i, keyword_line]
        i, line = self.cpp_keywords_dict[keyword](argv)

        step += 1

        return i, line, step

    def _parse_reference(self, argv: list):   # IN PROGRESS!
        LOOP_COND, ref, var_name, i, line, step, backtrack_i, backtrack_line = argv
        
        stmt_start = i
        BWD_IS_VAR_UPDATE = False
        for OP_LIST in next_chars["bwd_var_name"]:
            VAR_COND = self.code[i - len(OP_LIST[0]):i] in OP_LIST

            if VAR_COND == True:
                stmt_start -= len(OP_LIST[0])

            BWD_IS_VAR_UPDATE = BWD_IS_VAR_UPDATE or VAR_COND
        
        i += len(var_name)
        while self.code[i] in next_chars["line_wspc"] and LOOP_COND(i):
            i += 1
        
        FWD_IS_VAR_UPDATE = False
        if not BWD_IS_VAR_UPDATE:
            for OP_LIST in next_chars["fwd_var_name"]:
                VAR_COND = self.code[i:i + len(OP_LIST[0])] in OP_LIST
                FWD_IS_VAR_UPDATE = FWD_IS_VAR_UPDATE or VAR_COND
        
        IS_VAR_UPDATE = FWD_IS_VAR_UPDATE or BWD_IS_VAR_UPDATE

        if IS_VAR_UPDATE:
            highlight = line
            
            argv = [LOOP_COND, i, line, step, highlight, ref, stmt_start]
            i, line =  self._parse_VAR_UPDATE(argv)
            
            step += 1
            self._update_scope_stack(line)

            break_for_loop = True
            return i, line, step, break_for_loop
        else:
            break_for_loop = False
            return backtrack_i, backtrack_line, step, break_for_loop

    def _pop_COMMENT(self): # DONE!
        try:
            COMMENT_file = open("./temp/_COMMENT_file.txt", "w+")
        except:
            raise Exception("Error. Could not create _COMMENT_file.txt file.")
        
        i = 0
        line = 1
        LOOP_COND = lambda i: i < len(self.code)

        while LOOP_COND(i):
            if self.code[i] == "\n":
                line += 1
            
            if self.code[i:i+len("//")] == "//":
                # print(f"LINE COMMENT DETECTED AT LINE {line}")
                i += len("//")
                while self.code[i] != "\n" and LOOP_COND(i):
                    i += 1
                COMMENT_file.write("\n")
                line += 1
                i += len("\n")

            elif self.code[i:i+len("/*")] == "/*":
                # print(f"MULTI-LINE COMMENT DETECTED AT LINE {line}")
                i += len("/*")
                while self.code[i:i+len("*/")] != "*/" and LOOP_COND(i):
                    if self.code[i] == "\n":
                        COMMENT_file.write("\n")
                        line += 1
                    i += 1
                i += len("*/")

            else:
                COMMENT_file.write(self.code[i])
                i += 1
        
        COMMENT_file.seek(0)
        self.code = COMMENT_file.read()
        COMMENT_file.close()

        return self.code
    
    def _pop_INCLUDE(self): # DONE!
        try:
            INCLUDE_file = open("./temp/_INCLUDE_file.txt", "w+")
        except:
            raise Exception("Error. Could not create _INCLUDE_file.txt file.")
        
        i = 0
        line = 1
        
        LOOP_COND = lambda i: i < len(self.code)
        
        while LOOP_COND(i):
            if self.code[i] == "\n":
                line += 1
            
            if self.code[i:i+len("#include")] == "#include" and self.code[i+len("#include")] in [" ", '\"', "<"]:
                i += len("#include")
                while self.code[i] != "\n" and LOOP_COND(i):
                    if self.code[i] in ["<", '\"']:
                        i += len("<")
                        lib_name_start = i
                        while self.code[i] not in [">", '\"']:
                            i += 1
                        lib_name_end = i
                        lib_name = self.code[lib_name_start:lib_name_end]
                    i += len("<")
                i += len("\n")

                executionSteps = self.json_dict["executionSteps"] 
                executionSteps.append(
                    {
                        "highlight" : line,
                        "operation" : "INCLUDE",
                        "lib_name"  : lib_name,
                    }
                )
                self.json_dict["executionSteps"] = executionSteps

                INCLUDE_file.write("\n")
                line += 1
                
            else:
                INCLUDE_file.write(self.code[i])
                i += 1

        INCLUDE_file.seek(0)
        self.code = INCLUDE_file.read()
        INCLUDE_file.close()

        return self.code

    def _parse_FUNCT_DEFINE(self, argv: list):  # DONE!
        LOOP_COND, i, line, step, highlight, name, return_type = argv
        
        if name == "main":
            self.main_return_type = return_type
        
        if self.code[i] == "(":
            i += len("(")
        
        args_start = i
        while self.code[i] != ")" and LOOP_COND(i):
            if self.code[i] == "\n":
                line += 1
            i += 1
        args_end = i
        
        args = []
        raw_args = self.code[args_start:args_end].split(",")
        temp_list = [x.split("=") for x in raw_args]
        for entry in temp_list:
            final_entry = []
            for x in entry:
                final_entry.extend(x.split())
            args.append(final_entry)

        net_bracket_cnt = 0
        while self.code[i] != "{" and LOOP_COND(i):
            if self.code[i] == ";": # Means it's a function declaration, not definition!
                return i, line, step
            if self.code[i] == "\n":
                line += 1
            i += 1
        backtrack_i = i
        startLine = line
        net_bracket_cnt += 1

        while net_bracket_cnt != 0 and LOOP_COND(i):
            i += 1
            if self.code[i] == "\n":
                line += 1
            
            if self.code[i] == "{":
                net_bracket_cnt += 1
            elif self.code[i] == "}":
                net_bracket_cnt -= 1
        endLine = line

        executionSteps = self.json_dict["executionSteps"] 
        executionSteps.append(
            {
                "step"          : step,
                "highlight"     : highlight,
                "operation"     : "FUNCT_DEFINE",
                "name"          : name,
                "return_type"   : return_type,
                "args"          : args,
                "startLine"     : startLine,
                "endLine"       : endLine,
            }
        )
        self.json_dict["executionSteps"] = executionSteps
        
        scope_reference = f"__{return_type}__{name}()__"
        self.scope_stack.append([scope_reference, endLine, {}])

        step += 1

        return backtrack_i, startLine, step

    def _parse_VAR_DECLARE(self, argv: list):   # IN PROGRESS!
        LOOP_COND, i, line, step, highlight, name, data_type = argv
        
        if self.code[i] == "=":
            i += len("=")
            while self.code[i] in next_chars["line_wspc"] and LOOP_COND(i):
                i += 1
            value_start = i
            while self.code[i] != ";" and LOOP_COND(i):
                i += 1
            value_end = i
            value = self.code[value_start:value_end]
        else:   # self.code[i] == ";"
            value = "__UNINITIALIZED__"   # Uninitialized variable case
        
        reference = "__DECLAREDAT__" + str(highlight) + "__NAME__" + name

        self.scope_stack[-1][2][reference] =  [data_type, name, value]
        if value != "__UNINITIALIZED__":
            # Temporary fix, implement scalable solution
            if value == "true":
                value = "True"
            elif value == "false":
                value = "False"
            
            exec(f"{reference} = {value}", globals())
            # print(eval(reference))

        executionSteps = self.json_dict["executionSteps"] 
        executionSteps.append(
            {
                "step"      : step,
                "highlight" : highlight,
                "operation" : "VAR_DECLARE",
                "reference" : reference,
                "type"      : data_type,
                "name"      : name,
                "value"     : value
            }
        )
        self.json_dict["executionSteps"] = executionSteps
        
        step += 1

        return i, line, step

    def _parse_VAR_UPDATE(self, argv: list):  # DONE!
            LOOP_COND, i, line, step, highlight, reference, stmt_start = argv

            while self.code[i] != ";" and LOOP_COND(i):
                i += 1
            stmt_end = i
            
            update_stmt = self.code[stmt_start:stmt_end]
            #update_stmt = update_stmt.replace("=", " = ")
            update_stmt_list = self.code[stmt_start:stmt_end].split()
            
            # print(f"update_stmt_list = {update_stmt_list}")
            for scope in self.scope_stack[::-1]:
                for ref in scope[2].keys():
                    update_stmt_list = [ref if scope[2][ref][1] == x else x for x in update_stmt_list]

                    # Quick fix, find scalable solution
                    update_stmt_list = ["False" if x == "false" else x for x in update_stmt_list]
                    update_stmt_list = ["True" if x == "true" else x for x in update_stmt_list]
                try:
                    data_type = scope[2][reference][0]
                    name = scope[2][reference][1]
                    old_value = scope[2][reference][2]

                    target_scope = scope
                except:
                    pass
            # print(f"update_stmt_list = {update_stmt_list}")
            # print()
            ref_update_stmt = " ".join(update_stmt_list)

            exec(ref_update_stmt, globals())
            new_value = str(eval(reference))
            target_scope[2][reference][2] = new_value

            executionSteps = self.json_dict["executionSteps"] 
            executionSteps.append(
                {
                    "step"      : step,
                    "highlight" : highlight,
                    "operation" : "VAR_UPDATE",
                    "reference" : reference,
                    "type"      : data_type,  
                    "name"      : name,
                    "statement" : update_stmt,
                    "old_value" : old_value,
                    "new_value" : new_value
                },
            )
            self.json_dict["executionSteps"] = executionSteps
            
            return i, line

if __name__ == "__main__":
    code_file = open("ideal_parser_test.cpp", 'r')

    parser = Parser_CPP(code_file)