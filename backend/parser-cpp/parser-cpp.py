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

if __name__ == "__main__":
    code_file = open("ideal_parser_test.cpp", 'r')

    parser = Parser_CPP(code_file)