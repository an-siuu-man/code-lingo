# -*- coding: utf-8 -*-

# --- CODELINGO C++/C PARSER ---
# Author: Leo Cabezas Amigo
# Version: 1.0.1 (ready for HackKState!)

"""
IDEAS: Implement pointers, references, arrays, etc.
"""
"""
FUTURE TO/DO:
    VAR_DECLARE and VAR_UPDATE of the form 'int i = ++j' are not contemplated.
    Single-line multiple VAR_DECLARE (e.g. 'int i=0, j=1') is not contemplated.
    FUNC_DEFINE is not useful, since function evaluations are not contemplated.
    Need to implement remaining keyword functions as well.
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
                            ],
    "evaluate"          :   ["<<=", ">>=", "==", "!=", "<=", ">=", "&&", "||", "++", "--", 
                             "+=", "-=", "*=", "/=", "%=", "&=", "|=", "^=", "<<", ">>", "<", 
                             ">", "&", "|", "^", "~", "?", ":", "=", "!", ",", "(", ")", "[", "]"]

}

class Parser_CPP:
    def __init__(self, code_file):
        self.code = self._read_src(code_file) + "\n\n"
        self.code_lines = self._read_src(code_file, byLine = True)

        self.json_dict = {"code": self.code, "executionSteps": []}
        self.jsonResponse = ""

        self.cpp_keywords_dict = {
            "if"        : self._parse_if,       # IMPLEMENTED
            "else if"   : self._parse_elseif,   # IMPLEMENTED
            "else"      : self._parse_else,     # IMPLEMENTED
            "switch"    : self._parse_switch,
            "case"      : self._parse_case,
            "default"   : self._parse_default,
            "for"       : self._parse_for,      # IMPLEMENTED
            "while"     : self._parse_while,    # IMPLEMENTED
            "do"        : self._parse_dowhile,
            "break"     : self._parse_break,    # IMPLEMENTED
            "continue"  : self._parse_continue, # IMPLEMENTED
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
        
        if curr_scope_endline < 0:
            return

        if line > curr_scope_endline:
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

            self._update_scope_stack(line)
            
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
            
            self._update_scope_stack(line)

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

    def _parse_reference(self, argv: list):   # DONE!
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

    def _parse_FUNCT_DEFINE(self, argv: list):  # IN PROGRESS!
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

        scope_reference = f"__{return_type}__{name}()__"
        scope = self.scope_stack[-1][0]
        executionSteps = self.json_dict["executionSteps"] 
        executionSteps.append(
            {
                "step"          : step,
                "highlight"     : highlight,
                "operation"     : "FUNCT_DEFINE",
                "reference"     : scope_reference,
                "name"          : name,
                "return_type"   : return_type,
                "args"          : args,
                "startLine"     : startLine,
                "endLine"       : endLine,
                "scope"         : scope
            }
        )
        self.json_dict["executionSteps"] = executionSteps
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
            value_str = self.code[value_start:value_end]
            
            j = 0
            break_signal = False
            wsp_value_str = ""
            while j < len(value_str):
                for op in next_chars["evaluate"]:
                    if value_str[j:j+len(op)] == op:
                        substr = " " + op + " "
                        wsp_value_str += substr
                        
                        j += len(op)
                        if j >= len(value_str):
                            break_signal = True
                        
                        break
                if break_signal:
                    break

                wsp_value_str += value_str[j]
                j += 1

            value_list = wsp_value_str.split()
            value_list_corr = []
            for k in range(len(value_list)):
                if value_list[k] == "++":
                    if k == 0:
                        value_list_corr.append(value_list[k+1])
                        value_list_corr.extend(["+", "1"])
                        break
                    else:
                        value_list_corr.extend(["+", "1"])
                        break
                elif value_list[k] == "--":
                    if k == 0:
                        value_list_corr.append(value_list[k+1])
                        value_list_corr.extend(["-", "1"])
                        break
                    else:
                        value_list_corr.extend(["-", "1"])
                        break
                else:
                    value_list_corr.append(value_list[k])

            value_stmt = ""
            for l in range(len(value_list)):
                if l == 0 or value_list[l] in ["++", "--"]:
                    value_stmt += value_list[l]
                elif l != 0 and value_list[l-1] in ["++", "--"]:
                    value_stmt += value_list[l]
                else: 
                    value_stmt += " " + value_list[l]
            
            for scope in self.scope_stack[::-1]:
                for ref in scope[2].keys():
                    value_list_corr = [ref if scope[2][ref][1] == x else x for x in value_list_corr]

                    # Quick fix, find scalable solution
                    value_list_corr = ["False" if x == "false" else x for x in value_list_corr]
                    value_list_corr = ["True" if x == "true" else x for x in value_list_corr]
            ref_value_stmt = " ".join(value_list_corr)
            
            if ref_value_stmt.strip("\"").isalnum():
                value = ref_value_stmt
            else:
                value = eval(ref_value_stmt, globals())
        else:   # self.code[i] == ";"
            value = "__UNINITIALIZED__"   # Uninitialized variable case
        
        reference = "__DECLAREDAT__" + str(highlight) + "__NAME__" + name + "__"     
        self.scope_stack[-1][2][reference] =  [data_type, name, value]

        if value != "__UNINITIALIZED__":
            # Temporary fix, implement scalable solution
            if value == "true":
                value = "True"
            elif value == "false":
                value = "False"
            
            exec(f"{reference} = {value}", globals())

        scope = self.scope_stack[-1][0]
        executionSteps = self.json_dict["executionSteps"] 
        executionSteps.append(
            {
                "step"      : step,
                "highlight" : highlight,
                "operation" : "VAR_DECLARE",
                "reference" : reference,
                "type"      : data_type,
                "name"      : name,
                "value"     : value,
                "scope"     : scope
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

        j = 0
        break_signal = False
        wsp_update_stmt = ""
        while j < len(update_stmt):
            for op in next_chars["evaluate"]:
                if update_stmt[j:j+len(op)] == op:
                    substr = " " + op + " "
                    wsp_update_stmt += substr
                    
                    j += len(op)
                    if j >= len(update_stmt):
                        break_signal = True
                    
                    break
            if break_signal:
                break

            wsp_update_stmt += update_stmt[j]
            j += 1

        update_stmt_list = wsp_update_stmt.split()
        update_stmt_list_corr = []
        for k in range(len(update_stmt_list)):
            if update_stmt_list[k] == "++":
                if k == 0:
                    update_stmt_list_corr.append(update_stmt_list[k+1])
                    update_stmt_list_corr.extend(["+=", "1"])
                    break
                else:
                    update_stmt_list_corr.extend(["+=", "1"])
                    break
            elif update_stmt_list[k] == "--":
                if k == 0:
                    update_stmt_list_corr.append(update_stmt_list[k+1])
                    update_stmt_list_corr.extend(["-=", "1"])
                    break
                else:
                    update_stmt_list_corr.extend(["-=", "1"])
                    break
            else:
                update_stmt_list_corr.append(update_stmt_list[k])
        
        update_stmt = ""
        for l in range(len(update_stmt_list)):
            if l == 0 or update_stmt_list[l] in ["++", "--"]:
                update_stmt += update_stmt_list[l]
            elif l != 0 and update_stmt_list[l-1] in ["++", "--"]:
                update_stmt += update_stmt_list[l]
            else: 
                update_stmt += " " + update_stmt_list[l]
        
        for scope in self.scope_stack[::-1]:
            for ref in scope[2].keys():
                update_stmt_list_corr = [ref if scope[2][ref][1] == x else x for x in update_stmt_list_corr]

                # Quick fix, find scalable solution
                update_stmt_list_corr = ["False" if x == "false" else x for x in update_stmt_list_corr]
                update_stmt_list_corr = ["True" if x == "true" else x for x in update_stmt_list_corr]
            try:
                data_type = scope[2][reference][0]
                name = scope[2][reference][1]
                old_value = scope[2][reference][2]

                target_scope = scope
            except:
                pass
        
        ref_update_stmt = " ".join(update_stmt_list_corr)

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
                "new_value" : new_value,
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

        j = 0
        break_signal = False
        wsp_condition = ""
        while j < len(condition):
            for op in next_chars["evaluate"]:
                if condition[j:j+len(op)] == op:
                    substr = " " + op + " "
                    wsp_condition += substr
                    
                    j += len(op)
                    if j >= len(condition):
                        break_signal = True
                    
                    break
            if break_signal:
                break

            wsp_condition += condition[j]
            j += 1

        eval_stmt_list = wsp_condition.split()
        condition = " ".join(eval_stmt_list)

        for scope in self.scope_stack[::-1]:
            for ref in scope[2].keys():
                eval_stmt_list = [ref if scope[2][ref][1] == x else x for x in eval_stmt_list]
        ref_eval_stmt = " ".join(eval_stmt_list)

        raw_result = eval(ref_eval_stmt)
        result = str(raw_result)

        scope_reference = f"__DECLAREDAT__{highlight}__IF_BLOCK__"
        scope = self.scope_stack[-1][0]
        executionSteps = self.json_dict["executionSteps"] 
        executionSteps.append(
            {
                "step"      : step,
                "highlight" : highlight,
                "operation" : "IF_BLOCK",
                "reference" : scope_reference,
                "condition" : condition,
                "executed"  : result,
                "startLine" : startLine,
                "endLine"   : endLine,
                "scope"     : scope
            }
        )
        self.json_dict["executionSteps"] = executionSteps
        self.scope_stack.append([scope_reference, endLine, {}, raw_result, scope])

        step += 1
        
        if raw_result:
            return backtrack_i, startLine, step
        else:
            return i, endLine, step
    
    def _parse_elseif(self, argv: list):    # DONE!
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

        j = 0
        break_signal = False
        wsp_condition = ""
        while j < len(condition):
            for op in next_chars["evaluate"]:
                if condition[j:j+len(op)] == op:
                    substr = " " + op + " "
                    wsp_condition += substr
                    
                    j += len(op)
                    if j >= len(condition):
                        break_signal = True
                    
                    break
            if break_signal:
                break

            wsp_condition += condition[j]
            j += 1

        eval_stmt_list = wsp_condition.split()
        condition = " ".join(eval_stmt_list)

        for scope in self.scope_stack[::-1]:
            for ref in scope[2].keys():
                eval_stmt_list = [ref if scope[2][ref][1] == x else x for x in eval_stmt_list]
        ref_eval_stmt = " ".join(eval_stmt_list)

        raw_result = eval(ref_eval_stmt)
        result = str(raw_result)

        scope_reference = f"__DECLAREDAT__{highlight}__ELSEIF_BLOCK__"
        prev_scope = self.scope_stack[-1]
        if not (prev_scope[0].endswith("__IF_BLOCK__") or prev_scope[0].endswith("__ELSEIF_BLOCK__")):
            raise Exception("Error! ELSEIF BLOCK WITHOUT PRECEDING IF/ELSEIF BLOCK")
        any_executed = prev_scope[3]
        scope = prev_scope[4]
        execute =  not any_executed and raw_result
        any_executed = any_executed or execute

        executionSteps = self.json_dict["executionSteps"] 
        executionSteps.append(
            {
                "step"      : step,
                "highlight" : highlight,
                "operation" : "ELSEIF_BLOCK",
                "reference" : scope_reference,
                "condition" : condition,
                "executed"  : str(execute),
                "startLine" : startLine,
                "endLine"   : endLine,
                "scope"     : scope
            }
        )
        self.json_dict["executionSteps"] = executionSteps
        self.scope_stack.append([scope_reference, endLine, {}, any_executed, scope])

        step += 1
        
        if execute:
            return backtrack_i, startLine, step
        else:
            return i, endLine, step

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

        scope_reference = f"__DECLAREDAT__{highlight}__ELSE_BLOCK__"       
        prev_scope = self.scope_stack[-1]
        if not (prev_scope[0].endswith("__IF_BLOCK__") or prev_scope[0].endswith("__ELSEIF_BLOCK__")):
            raise Exception("Error! ELSE BLOCK WITHOUT PRECEDING IF/ELSEIF BLOCK")
        any_executed = prev_scope[3]
        scope = prev_scope[4]
        executed = not any_executed

        executionSteps = self.json_dict["executionSteps"] 
        executionSteps.append(
            {
                "step"      : step,
                "highlight" : highlight,
                "operation" : "ELSE_BLOCK",
                "executed"  : str(executed),
                "reference" : scope_reference,
                "startLine" : startLine,
                "endLine"   : endLine,
                "scope"     : scope
            }
        )
        self.json_dict["executionSteps"] = executionSteps        
        self.scope_stack.append([scope_reference, endLine, {}])

        step += 1

        if executed:
            return backtrack_i, startLine, step
        else:
            return i, endLine, step

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

    def _parse_for(self, argv: list):  # DONE!
        LOOP_COND, i, line, step, highlight, start_for_i, start_for_line = argv[:7]

        scope_reference = f"__DECLAREDAT__{highlight}__FOR_LOOP__"
        if self.scope_stack[-1][0] == scope_reference:
            loop_params_update = self.scope_stack[-1][3][0]
            loop_params_continue = self.scope_stack[-1][3][1]
            
            ref_eval_stmt, in_for_i, in_for_line, end_for_i, end_for_line = loop_params_update
            stmts_update_i, stmts_update_line, stmts_end_i, stmts_end_line = loop_params_continue
            
            raw_result = eval(ref_eval_stmt)
            
            if raw_result:
                i, line, step = self._parse_section(in_for_i, in_for_line, step, end_for_i, end_for_line)
                if i > end_for_i:
                    return end_for_i, end_for_line, step
                self._parse_section(stmts_update_i, stmts_update_line, step, stmts_end_i, stmts_end_line + 1)
                return start_for_i - 1, start_for_line, step
            else:
                return end_for_i, end_for_line, step

        while self.code[i] in next_chars["line_wspc"] and LOOP_COND(i):
            i += 1
        if self.code[i] == "(":
            i += len("(")
        stmts_start_i = i
        stmts_start_line = line
        
        FIRST_SEMICOLON = True
        while self.code[i] != ")" and LOOP_COND(i):
            if self.code[i] == "\n":
                line += 1
            if self.code[i] == ";":
                if FIRST_SEMICOLON:
                    stmts_init_i = i
                    stmts_init_line = line
                    FIRST_SEMICOLON = False
                stmts_update_i = i + 1
                stmts_update_line = line
            
            i += 1
        stmts_end_i = i
        stmts_end_line = line
        statements = self.code[stmts_start_i:stmts_end_i]

        scope_reference = f"__DECLAREDAT__{highlight}__FOR_LOOP__"
        self.scope_stack.append([scope_reference, -1, {}, [], []])
        
        self._parse_section(stmts_start_i, stmts_start_line, step, stmts_init_i, stmts_init_line + 1)

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

        statements_list = [" ".join(x.split()) for x in statements.split(";")]
        condition = statements_list[1]

        j = 0
        break_signal = False
        wsp_condition = ""
        while j < len(condition):
            for op in next_chars["evaluate"]:
                if condition[j:j+len(op)] == op:
                    substr = " " + op + " "
                    wsp_condition += substr
                    
                    j += len(op)
                    if j >= len(condition):
                        break_signal = True
                    
                    break
            if break_signal:
                break

            wsp_condition += condition[j]
            j += 1

        eval_stmt_list = wsp_condition.split()
        condition = " ".join(eval_stmt_list)

        for scope in self.scope_stack[::-1]:
            for ref in scope[2].keys():
                eval_stmt_list = [ref if scope[2][ref][1] == x else x for x in eval_stmt_list]
                
                # Quick fix, find scalable solution
                eval_stmt_list = ["False" if x == "false" else x for x in eval_stmt_list]
                eval_stmt_list = ["True" if x == "true" else x for x in eval_stmt_list]
        ref_eval_stmt = " ".join(eval_stmt_list)
        
        raw_result = eval(ref_eval_stmt)
        result = str(raw_result)
        
        in_for_i = backtrack_i
        in_for_line = startLine
        end_for_i = i
        end_for_line = endLine
        loop_params_update = [ref_eval_stmt, in_for_i, in_for_line, end_for_i, end_for_line]
        loop_params_continue = [stmts_update_i, stmts_update_line, stmts_end_i, stmts_end_line]
        control_params = [start_for_i, start_for_line, end_for_i, end_for_line]

        self.scope_stack[-1][1] = endLine
        self.scope_stack[-1][3].extend([loop_params_update, loop_params_continue])
        self.scope_stack[-1][4].extend(control_params)

        scope = self.scope_stack[-2][0]
        executionSteps = self.json_dict["executionSteps"] 
        executionSteps.append(
            {
                "step"      : step,
                "highlight" : highlight,
                "operation" : "FOR_LOOP",
                "reference" : scope_reference,
                "statements": statements_list,
                "condition" : condition,
                "result"    : result,
                "startLine" : startLine,
                "endLine"   : endLine,
                "scope"     : scope
            }
        )
        self.json_dict["executionSteps"] = executionSteps

        step += 1

        if raw_result:
            return start_for_i - 1, start_for_line, step
        else:
            return i, endLine, step

    def _parse_while(self, argv: list): # DONE!
        LOOP_COND, i, line, step, highlight, start_while_i, start_while_line = argv[:7]
        
        scope_reference = f"__DECLAREDAT__{highlight}__WHILE_LOOP__"
        if self.scope_stack[-1][0] == scope_reference:
            loop_params = self.scope_stack[-1][3]
            ref_eval_stmt, in_while_i, in_while_line, end_while_i, end_while_line = loop_params
            raw_result = eval(ref_eval_stmt)

            if raw_result:
                i, line, step = self._parse_section(in_while_i, in_while_line, step, end_while_i, end_while_line + 1)
                if i > end_while_i:
                    return end_while_i, end_while_line, step
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

        j = 0
        break_signal = False
        wsp_condition = ""
        while j < len(condition):
            for op in next_chars["evaluate"]:
                if condition[j:j+len(op)] == op:
                    substr = " " + op + " "
                    wsp_condition += substr
                    
                    j += len(op)
                    if j >= len(condition):
                        break_signal = True
                    
                    break
            if break_signal:
                break

            wsp_condition += condition[j]
            j += 1

        eval_stmt_list = wsp_condition.split()
        condition = " ".join(eval_stmt_list)

        for scope in self.scope_stack[::-1]:
            for ref in scope[2].keys():
                eval_stmt_list = [ref if scope[2][ref][1] == x else x for x in eval_stmt_list]
                
                # Quick fix, find scalable solution
                eval_stmt_list = ["False" if x == "false" else x for x in eval_stmt_list]
                eval_stmt_list = ["True" if x == "true" else x for x in eval_stmt_list]
        ref_eval_stmt = " ".join(eval_stmt_list)

        raw_result = eval(ref_eval_stmt)
        result = str(raw_result)

        scope_reference = f"__DECLAREDAT__{highlight}__WHILE_LOOP__"
        scope = self.scope_stack[-1][0]
        executionSteps = self.json_dict["executionSteps"] 
        executionSteps.append(
            {
                "step"      : step,
                "highlight" : highlight,
                "operation" : "WHILE_LOOP",
                "reference" : scope_reference,
                "condition" : condition,
                "result"    : result,
                "startLine" : startLine,
                "endLine"   : endLine,
                "scope"     : scope
            }
        )
        self.json_dict["executionSteps"] = executionSteps
        
        in_while_i = backtrack_i
        in_while_line = startLine
        end_while_i = i
        end_while_line = endLine
        loop_params = [ref_eval_stmt, in_while_i, in_while_line, end_while_i, end_while_line]
        control_params = [start_while_i, start_while_line, end_while_i, end_while_line]

        self.scope_stack.append([scope_reference, endLine, {}, loop_params, control_params])

        step += 1

        if raw_result:
            return start_while_i - 1, start_while_line, step
        else:
            return i, endLine, step

    def _parse_dowhile(self, argv: list):   # IN PROGRESS!
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

    def _parse_break(self, argv: list): # DONE!
        LOOP_COND, i, line, step, highlight = argv[:5]

        loop_scope = None
        for scope in self.scope_stack[::-1]:
            if scope[0].endswith("__FOR_LOOP__") or scope[0].endswith("__WHILE_LOOP__"):
                loop_scope = scope
                break
        if loop_scope == None:
            raise Exception("Error! BREAK statement outside of LOOP block.")
        
        control_params = loop_scope[4]
        start_loop_i, start_loop_line, end_loop_i, end_loop_line = control_params
        
        reference = f"__DECLAREDAT__{highlight}__BREAK__"
        scope = self.scope_stack[-1][0]
        executionSteps = self.json_dict["executionSteps"] 
        executionSteps.append(
            {
                "step"      : step,
                "highlight" : highlight,
                "operation" : "BREAK",
                "reference" : reference,
                "scope"     : scope
            }
        )
        self.json_dict["executionSteps"] = executionSteps

        return end_loop_i, end_loop_line, step

    def _parse_continue(self, argv: list):  # DONE!
        LOOP_COND, i, line, step, highlight = argv[:5]

        loop_scope = None
        for scope in self.scope_stack[::-1]:
            if scope[0].endswith("__FOR_LOOP__") or scope[0].endswith("__WHILE_LOOP__"):
                loop_scope = scope
                break
        if loop_scope == None:
            raise Exception("Error! CONTINUE statement outside of LOOP block.")
        
        control_params = loop_scope[4]
        start_loop_i, start_loop_line, end_loop_i, end_loop_line = control_params
        
        reference = f"__DECLAREDAT__{highlight}__CONTINUE__"
        scope = self.scope_stack[-1][0]
        executionSteps = self.json_dict["executionSteps"] 
        executionSteps.append(
            {
                "step"      : step,
                "highlight" : highlight,
                "operation" : "CONTINUE",
                "reference" : reference,
                "scope"     : scope
            }
        )
        self.json_dict["executionSteps"] = executionSteps

        return end_loop_i - 1, end_loop_line, step

    def _parse_return(self, argv: list):    # IN PROGRESS!
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
#     code_file = open("ideal_parser_test.cpp", 'r')

#     parser = Parser_CPP(code_file)
#     parser.generate_json()
#     print()
#     scope_stack = json.dumps(parser.scope_stack, indent=4)
#     print(f"parser.scope_stack = \n{scope_stack}")
#     print()
#     scope_registry = json.dumps(parser.scope_registry, indent=4)
#     print(f"parser.scope_registry = \n{scope_registry}")
#     print()
#     print(f"parser.jsonResponse = \n{parser.jsonResponse}")
#     print()
    
    

    app.run(port=5000)
