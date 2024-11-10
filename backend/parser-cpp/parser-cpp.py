# -*- coding: utf-8 -*-

# --- CODELINGO C++ PARSER ---
# Author: Leo Cabezas Amigo

"""
IDEAS: Implement pointers, references, arrays
"""

"""
ISSUES: '\n'-type whitespaces are not contemplated properly in dtype, keyword, var_name statements
BUGS:   randomVar+= 12 gives issues. randomVar += 12 (notice space) does NOT.
        int i = 0, j = 5; NOT CONTEMPLATED!!!
        VARIABLE INITIALIZATION WITH OTHER VARIABLES!!!
"""

from flask import Flask, jsonify, request
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

        self.cpp_keywords_dict = {
            "if"        : self._parse_if,
            "else"      : self._parse_else,
            "switch"    : self._parse_switch,
            "case"      : self._parse_case,
            "default"   : self._parse_default,
            "for"       : self._parse_for,
            "while"     : self._parse_while,
            "do"        : self._parse_dowhile,
            "break"     : self._parse_break,
            "continue"  : self._parse_continue,
            "return"    : self._parse_return,
            "goto"      : self._parse_goto,
            "throw"     : self._parse_throw,
            "try"       : self._parse_try,
            "catch"     : self._parse_catch
        }

        self.scope_stack = []
        self.scope_stack.append(["__SCOPE__GLOBAL__", len(self.code_lines), {}])
        self.scope_registry = [] 

    def _read_src(self, file, byLine = False):  # DONE!
        try:
            file.seek(0)
            return file.read() if not byLine else file.readlines()
        except:
            raise Exception("Error. Could not open src_code file.")

    def _update_scope_stack(self, line):    # DONE!
        if len(self.scope_stack) == 0:
            return
        
        global_scope_endline = self.scope_stack[0][1]
        curr_scope_endline = self.scope_stack[-1][1]
        
        if line >= curr_scope_endline:
            old_scope = self.scope_stack.pop()
            self.scope_registry.append(old_scope)
        if line == global_scope_endline and len(self.scope_stack) != 0:
            old_scope = self.scope_stack.pop()
            self.scope_registry.append(old_scope)
        
        return

    def _parse_code(self):  # IN PROGRESS!
        i = 0
        line = 1
        step = 1
        
        LOOP_COND = lambda i: i < len(self.code)
        
        while LOOP_COND(i):
            if self.code[i] == "\n":
                line += 1
            
            for dtype in cpp_data_types:
                if self.code[i:i+len(dtype)] == dtype and self.code[i+len(dtype)] in next_chars["line_wspc"]:
                    argv = [LOOP_COND, dtype, i, line, step]
                    i, line, step = self._parse_dtype(argv)
                    self._update_scope_stack(line)
                    break
            
            for keyword in self.cpp_keywords_dict:
                keyword_i = i
                keyword_line = line
                if self.code[i:i+len(keyword)] == keyword and self.code[i+len(keyword)] in next_chars["begin_keyword"]:
                    argv = [LOOP_COND, keyword, i, line, step, keyword_i, keyword_line]
                    i, line, step = self._parse_keyword(argv)
                    self._update_scope_stack(line)
                    break
            
            for scope in self.scope_stack[::-1]:
                for ref in scope[2].keys():
                    var_name = scope[2][ref][1]
                    backtrack_i = i
                    backtrack_line = line

                    if self.code[i:i+len(var_name)] == var_name:
                        argv = [LOOP_COND, ref, var_name, i, line, step, backtrack_i, backtrack_line]
                        i, line, step, break_for_loop = self._parse_reference(argv)
                        
                        if break_for_loop:
                            break
            
            i += 1
            self._update_scope_stack(line)

        return self.json_dict
    
    def _parse_section(self, init_i, init_line, init_step, end_i, end_line):  # DONE!
        i = init_i
        line = init_line
        step = init_step
        
        LOOP_COND = lambda i: i < end_i
        
        while LOOP_COND(i):
            if self.code[i] == "\n":
                line += 1
            
            if line >= end_line:
                break
            
            for dtype in cpp_data_types:
                if self.code[i:i+len(dtype)] == dtype and self.code[i+len(dtype)] in next_chars["line_wspc"]:
                    argv = [LOOP_COND, dtype, i, line, step]
                    i, line, step = self._parse_dtype(argv)
                    self._update_scope_stack(line)
                    break
            
            for keyword in self.cpp_keywords_dict:
                keyword_i = i
                keyword_line = line
                if self.code[i:i+len(keyword)] == keyword and self.code[i+len(keyword)] in next_chars["begin_keyword"]:
                    argv = [LOOP_COND, keyword, i, line, step, keyword_i, keyword_line]
                    i, line, step = self._parse_keyword(argv)
                    self._update_scope_stack(line)
                    break
            
            for scope in self.scope_stack[::-1]:
                for ref in scope[2].keys():
                    var_name = scope[2][ref][1]
                    backtrack_i = i
                    backtrack_line = line

                    if self.code[i:i+len(var_name)] == var_name:
                        argv = [LOOP_COND, ref, var_name, i, line, step, backtrack_i, backtrack_line]
                        i, line, step, break_for_loop = self._parse_reference(argv)
                        
                        if break_for_loop:
                            break
            
            i += 1
            
            print(f"self.code[i] = {self.code[i]}; line = {line}")
            self._update_scope_stack(line)
        
        return i, line, step
    
    def _parse_dtype(self, argv: list):   # DONE!
        LOOP_COND, dtype, i, line, step = argv
        
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

        argv = [LOOP_COND, i, line, step, highlight, name, dtype]
        if self.code[i] in ["=", ";"]: # Means it's VAR_DECLARE
            i, line, step = self._parse_VAR_DECLARE(argv)
        elif self.code[i] == "(":   # Means it's FUNCT_DEFINE
            i, line, step = self._parse_FUNCT_DEFINE(argv)
        else:
            raise Exception("Error! Unknown dtype-init statement.")
        
        return i, line, step

    def _parse_keyword(self, argv: list):   # DONE!
        LOOP_COND, keyword, i, line, step, keyword_i, keyword_line = argv
        
        i += len(keyword) + 1
        highlight = line
        
        argv = [LOOP_COND, i, line, step, highlight, keyword_i, keyword_line]
        i, line, step = self.cpp_keywords_dict[keyword](argv)

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

    def _parse_VAR_DECLARE(self, argv: list):   # DONE!
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
    
    def _parse_if(self, argv: list):    # DONE!
        LOOP_COND, i, line, step, highlight = argv[:5]

        while self.code[i] in next_chars["line_wspc"] and LOOP_COND(i):
            i += 1
        if self.code[i] == "(":
            i += len("(")
        cond_start = i
        while self.code[i] != ")" and LOOP_COND(i):
            if self.code[i] == "\n":
                line += 1
            i += 1
        cond_end = i
        
        condition = self.code[cond_start:cond_end]

        net_bracket_cnt = 0
        while self.code[i] != "{" and LOOP_COND(i):
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

        eval_stmt_list = condition.split()

        for scope in self.scope_stack[::-1]:
            for ref in scope[2].keys():
                eval_stmt_list = [ref if scope[2][ref][1] == x else x for x in eval_stmt_list]
        ref_eval_stmt = " ".join(eval_stmt_list)

        result = str(eval(ref_eval_stmt))

        executionSteps = self.json_dict["executionSteps"] 
        executionSteps.append(
            {
                "step"      : step,
                "highlight" : highlight,
                "operation" : "IF_BLOCK",
                "condition" : condition,
                "result"    : result,
                "startLine" : startLine,
                "endLine"   : endLine
            }
        )
        self.json_dict["executionSteps"] = executionSteps

        scope_reference = f"__DECLAREDAT__{highlight}__IF_BLOCK__"
        self.scope_stack.append([scope_reference, endLine, {}])

        step += 1

        return backtrack_i, startLine, step

    def _parse_else(self, argv: list):  # DONE!
        LOOP_COND, i, line, step, highlight = argv[:5]

        net_bracket_cnt = 0
        while self.code[i] != "{" and LOOP_COND(i):
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
                "step"      : step,
                "highlight" : highlight,
                "operation" : "ELSE_BLOCK",
                "startLine" : startLine,
                "endLine"   : endLine
            }
        )
        self.json_dict["executionSteps"] = executionSteps

        scope_reference = f"__DECLAREDAT__{highlight}__ELSE_BLOCK__"
        self.scope_stack.append([scope_reference, endLine, {}])

        step += 1

        return backtrack_i, startLine, step

    def _parse_switch(self, argv: list):
        LOOP_COND, i, line, step, highlight = argv[:5]

        net_bracket_cnt = 0
        while self.code[i] != "{" and LOOP_COND(i):
            if self.code[i] == ";": # Function declaration, not definition!
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

        return i, endLine, step

    def _parse_case(self, argv: list):
        LOOP_COND, i, line, step, highlight = argv[:5]
        return i, line, step

    def _parse_default(self, argv: list):
        LOOP_COND, i, line, step, highlight = argv[:5]
        return i, line, step

    def _parse_for(self, argv: list):
        LOOP_COND, i, line, step, highlight = argv[:5]

        net_bracket_cnt = 0
        while self.code[i] != "{" and LOOP_COND(i):
            if self.code[i] == ";": # Function declaration, not definition!
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

        return i, endLine, step

    def _temp_parse_for(self, argv: list):  # IN PROGRESS!
        LOOP_COND, i, line, step, highlight, start_for_i, start_for_line = argv[:7]
        
        scope_reference = f"__DECLAREDAT__{highlight}__FOR_LOOP__"
        if self.scope_stack[-1][0] == scope_reference:
            loop_params = self.scope_stack[-1][3]
            ref_eval_stmt, in_for_i, in_for_line, end_for_i, end_for_line = loop_params
            raw_result = eval(ref_eval_stmt)

            if raw_result:
                i, line, step = self._parse_section(in_for_i, in_for_line, step, end_for_i, end_for_line)
                return start_for_i - 1, start_for_line, step
            else:
                return end_for_i, end_for_line, step

        while self.code[i] in next_chars["line_wspc"] and LOOP_COND(i):
            i += 1
        if self.code[i] == "(":
            i += len("(")
        stmts_start = i
        while self.code[i] != ")" and LOOP_COND(i):
            if self.code[i] == "\n":
                line += 1
            i += 1
        stmts_end = i
        
        statements = self.code[stmts_start:stmts_end]

        net_bracket_cnt = 0
        while self.code[i] != "{" and LOOP_COND(i):
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

        eval_stmt_list = statements.split()

        for scope in self.scope_stack[::-1]:
            for ref in scope[2].keys():
                eval_stmt_list = [ref if scope[2][ref][1] == x else x for x in eval_stmt_list]
                
                # Quick fix, find scalable solution
                eval_stmt_list = ["False" if x == "false" else x for x in eval_stmt_list]
                eval_stmt_list = ["True" if x == "true" else x for x in eval_stmt_list]
        ref_eval_stmt = " ".join(eval_stmt_list)

        raw_result = eval(ref_eval_stmt)
        result = str(raw_result)

        executionSteps = self.json_dict["executionSteps"] 
        # executionSteps.append(
        #     {
        #         "step"      : step,
        #         "highlight" : highlight,
        #         "operation" : "FOR_LOOP",
        #         "statements": statements,
        #         "condition" : condition,
        #         "result"    : result,
        #         "startLine" : startLine,
        #         "endLine"   : endLine
        #     }
        # )
        self.json_dict["executionSteps"] = executionSteps
        
        scope_reference = f"__DECLAREDAT__{highlight}__WHILE_LOOP__"

        in_for_i = backtrack_i
        in_for_line = startLine
        end_for_i = i
        end_for_line = endLine
        while_loop_params = [ref_eval_stmt, in_for_i, in_for_line, end_for_i, end_for_line]
        
        self.scope_stack.append([scope_reference, endLine, {}, while_loop_params])

        step += 1

        # if raw_result:
        #     return start_while_i - 1, start_while_line, step
        # else:
        #     return i, endLine, step

    def _parse_while(self, argv: list): # DONE!
        LOOP_COND, i, line, step, highlight, start_while_i, start_while_line = argv[:7]
        
        scope_reference = f"__DECLAREDAT__{highlight}__WHILE_LOOP__"
        if self.scope_stack[-1][0] == scope_reference:
            loop_params = self.scope_stack[-1][3]
            ref_eval_stmt, in_while_i, in_while_line, end_while_i, end_while_line = loop_params
            raw_result = eval(ref_eval_stmt)

            if raw_result:
                i, line, step = self._parse_section(in_while_i, in_while_line, step, end_while_i, end_while_line)
                return start_while_i - 1, start_while_line, step
            else:
                return end_while_i, end_while_line, step

        while self.code[i] in next_chars["line_wspc"] and LOOP_COND(i):
            i += 1
        if self.code[i] == "(":
            i += len("(")
        cond_start = i
        while self.code[i] != ")" and LOOP_COND(i):
            if self.code[i] == "\n":
                line += 1
            i += 1
        cond_end = i
        
        condition = self.code[cond_start:cond_end]

        net_bracket_cnt = 0
        while self.code[i] != "{" and LOOP_COND(i):
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

        eval_stmt_list = condition.split()

        for scope in self.scope_stack[::-1]:
            for ref in scope[2].keys():
                eval_stmt_list = [ref if scope[2][ref][1] == x else x for x in eval_stmt_list]
                
                # Quick fix, find scalable solution
                eval_stmt_list = ["False" if x == "false" else x for x in eval_stmt_list]
                eval_stmt_list = ["True" if x == "true" else x for x in eval_stmt_list]
        ref_eval_stmt = " ".join(eval_stmt_list)

        raw_result = eval(ref_eval_stmt)
        result = str(raw_result)

        executionSteps = self.json_dict["executionSteps"] 
        executionSteps.append(
            {
                "step"      : step,
                "highlight" : highlight,
                "operation" : "WHILE_LOOP",
                "condition" : condition,
                "result"    : result,
                "startLine" : startLine,
                "endLine"   : endLine
            }
        )
        self.json_dict["executionSteps"] = executionSteps
        
        scope_reference = f"__DECLAREDAT__{highlight}__WHILE_LOOP__"

        in_while_i = backtrack_i
        in_while_line = startLine
        end_while_i = i
        end_while_line = endLine
        while_loop_params = [ref_eval_stmt, in_while_i, in_while_line, end_while_i, end_while_line]
        
        self.scope_stack.append([scope_reference, endLine, {}, while_loop_params])

        step += 1

        if raw_result:
            return start_while_i - 1, start_while_line, step
        else:
            return i, endLine, step

    def _parse_dowhile(self, argv: list):
        LOOP_COND, i, line, step, highlight = argv[:5]

        net_bracket_cnt = 0
        while self.code[i] != "{" and LOOP_COND(i):
            if self.code[i] == ";": # Function declaration, not definition!
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

        while self.code[i] != ";":
            if self.code[i] == "\n":
                line += 1
            i += 1

        return i, line, step

    def _parse_break(self, argv: list):
        LOOP_COND, i, line, step, highlight = argv[:5]        
        return i, line, step

    def _parse_continue(self, argv: list):
        LOOP_COND, i, line, step, highlight = argv[:5]
        return i, line, step

    def _parse_return(self, argv: list):
        LOOP_COND, i, line, step, highlight = argv[:5]
        return i, line, step

    def _parse_goto(self, argv: list):
        LOOP_COND, i, line, step, highlight = argv[:5]
        return i, line, step

    def _parse_throw(self, argv: list):
        LOOP_COND, i, line, step, highlight = argv[:5]
        return i, line, step

    def _parse_try(self, argv: list):
        LOOP_COND, i, line, step, highlight = argv[:5]

        net_bracket_cnt = 0
        while self.code[i] != "{" and LOOP_COND(i):
            if self.code[i] == ";": # Function declaration, not definition!
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

        return i, endLine, step

    def _parse_catch(self, argv: list):
        LOOP_COND, i, line, step, highlight = argv[:5]

        net_bracket_cnt = 0
        while self.code[i] != "{" and LOOP_COND(i):
            if self.code[i] == ";": # Function declaration, not definition!
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

        return i, endLine, step

    def generate_json(self):
        self._pop_COMMENT() # Preprocessing
        self._pop_INCLUDE() # Preprocessing
        self._parse_code()  # Actual parsing

        self.jsonResponse = json.dumps(self.json_dict, indent=4)
        return self.jsonResponse


app = Flask(__name__)


@app.route('/parse_string', methods=['POST'])
def parse_code_string():
    retJSON = None
    if request.method == 'POST':
        code_string = request.json.get('code_string')
        print(code_string)
        if not code_string:
            return jsonify({"error": "No code string provided"}), 400
        with open(os.path.join(os.path.dirname(__file__), 'temp_code.cpp'), 'w+') as temp_code_file:
            temp_code_file.write(code_string)
            parser = Parser_CPP(temp_code_file)
            parser.generate_json()
            retJSON = parser.jsonResponse
        return retJSON

if __name__ == "__main__":
    app.run(port=5000)

